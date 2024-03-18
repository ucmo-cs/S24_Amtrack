import pymongo

from urllib.parse import quote
from pymongo.server_api import ServerApi

def connect_to_mongodb():
    uri = "mongodb://localhost:27017" 
    client = pymongo.MongoClient(uri, server_api=ServerApi('1'))

    try:
        db = client.Amtrak
        return db
    except Exception as e:
        print(e)






