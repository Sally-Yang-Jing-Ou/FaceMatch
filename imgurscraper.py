import posixpath
import urlparse
import requests
import praw
import time
import os
import sys

subreddit_name = "kpics"
gender = "F"

r = praw.Reddit('Experimenting with praw')
subreddit = r.get_subreddit(subreddit_name)

def download_image(image_url, name):

    # grabs the code from the end of the imgur link, minus the file ext if it exists
    imageID = image_url.split("/")[len(image_url.split("/"))-1].split("\n")[0].split(".")[0] 
    url = "http://api.imgur.com/2/image/" + imageID +  ".json"

    print "Attempting to download " + name + " from " + url

    r = requests.get(url)
    img_url = r.json()["image"]["links"]["original"]
    fn = posixpath.basename(urlparse.urlsplit(img_url).path)

    r = requests.get(img_url)

    with open(fn, "wb") as f:
        f.write(r.content)
        os.rename(f.name, gender + "-" + name + "-" + imageID)

for submission in subreddit.get_hot(limit=1000):
    if ("imgur" in submission.url) and ("/a/" not in submission.url) and ("/" not in submission.title):
        download_image(submission.url, submission.title)

for submission in subreddit.get_top(limit=1000):
    if ("imgur" in submission.url) and ("/a/" not in submission.url) and ("/" not in submission.title):
        download_image(submission.url, submission.title)



