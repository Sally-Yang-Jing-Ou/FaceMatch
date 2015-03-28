#!/usr/bin/env python

import sqlite3, random
from flask import Flask, jsonify, request, g

DATABASE_PATH = "database.db"

app = Flask(__name__)

def get_db():
    db = getattr(g, "_database", None)
    if db is None: db = g._database = sqlite3.connect(DATABASE_PATH)
    return db

@app.teardown_appcontext
def close_connection(exception):
    db = getattr(g, "_database", None)
    if db is not None: db.close()

def query_db(query, args=(), one=True):
    results = get_db().execute(query, args)
    if one:
        try: return next(results)
        except StopIteration: return None
    return list(results)

# static file serving
@app.route("/img/<path:path>")
def static_img_proxy(path): return app.send_static_file("img/" + path) # MIME type is guessed automatically
@app.route("/lib/<path:path>")
def static_lib_proxy(path): return app.send_static_file("lib/" + path) # MIME type is guessed automatically
@app.route("/")
def index(): return app.send_static_file("index.html") # MIME type is guessed automatically

@app.route("/matches")
def post_matches():
    db = get_db()
    left, right, yes_or_no = request.args["left"], request.args["right"], request.args["yes_or_no"]
    if right < left: left, right = right, left
    result = query_db("SELECT yes, no FROM matches WHERE guid1 = ? AND guid2 = ?", (left, right), True)
    db.execute("DELETE FROM matches WHERE guid1 = ? AND guid2 = ?", (left, right))

    count_left, count_right = int(bool(int(yes_or_no))), int(not bool(int(yes_or_no)))
    print(result, count_left, count_right)
    if result is not None: count_left, count_right = count_left + result[0], count_right + result[1]

    db.execute("INSERT INTO matches VALUES(?, ?, ?, ?)", (left, right, count_left, count_right))
    db.commit()
    return jsonify(chose_left=count_left, chose_right=count_right)

def get_category(category):
    max_id = query_db("SELECT COUNT(*) FROM images WHERE category = ?", (category,), True)[0]
    if max_id == 0: raise ValueError("No images available")
    index = random.randrange(max_id)
    return query_db("SELECT path FROM images WHERE category = ? LIMIT 1 OFFSET ?", (category, index), True)

@app.route("/pairs")
def get_pairs():
    return jsonify(left=get_category(1), right=get_category(2))

if __name__ == "__main__":
    app.run(debug=True, port=5000) # debug mode
    #app.run(debug=False, host="0.0.0.0", port=80) # release mode - publicly visible
