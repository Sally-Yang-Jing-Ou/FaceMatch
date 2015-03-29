#!/usr/bin/env python3

import sqlite3, os, re

DATABASE_PATH = "database.db"
FILES_PATH = "static/img/"

pattern = re.compile(r"^[A-Za-z0-9\- @\.&;\[\]]+$", re.IGNORECASE)
db = sqlite3.connect(DATABASE_PATH)
count = 0
for image in os.listdir(FILES_PATH):
    if not pattern.match(image): continue # ignore invalid filenames
    category = 1 if image[0:2] == "M-" else 2
    path = "/img/" +  image
    db.execute("INSERT OR REPLACE INTO images VALUES(?, ?)", (image, category))
    count += 1
db.commit()
db.close()
print("IMPORTED {} ENTRIES".format(count))
