import posixpath
import urlparse
import requests
import praw
import time
import os
import sys

subreddit_name = "kpecs"
gender = "M"

r = praw.Reddit('scraping data for use with facematch')
subreddit = r.get_subreddit(subreddit_name)
amount = 1000;

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

def is_valid_url(url):
    return ("imgur" in submission.url) and ("/a/" not in submission.url) and ("/" not in submission.title)

for submission in subreddit.get_hot(limit=amount):
    if is_valid_url(submission.url):
        download_image(submission.url, submission.title)

for submission in subreddit.get_top(limit=amount):
    if is_valid_url(submission.url):
        download_image(submission.url, submission.title)



