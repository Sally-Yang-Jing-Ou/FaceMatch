#!/usr/bin/env python3

import sqlite3, os

DATABASE_PATH = "database.db"
FILES_PATH = "static/img/"

db = sqlite3.connect(DATABASE_PATH)
count = 0
for image in os.listdir(FILES_PATH):
    if ":" in image or image in "?": continue # ignore invalid filenames
    category = 1 if image[0:2] == "M-" else 2
    path = "/img/" +  image
    db.execute("INSERT OR REPLACE INTO images VALUES(?, ?)", (image, category))
    count += 1
db.commit()
db.close()
print("IMPORTED {} ENTRIES".format(count))
