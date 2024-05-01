from bson import ObjectId
from flask import jsonify
from MongoConnectionHelper import connect_to_mongodb
try:
    db = connect_to_mongodb()
except:
    print("unable to connect or already in running state")

def AddBooking(data):
    data_insert = db["Bookings"].insert_one(data)
    if(data_insert):
        return str(data_insert.inserted_id)
    return "failure"

def AddTickets(data):
    data_insert = db["Tickets"].insert_many(data)
    if(data_insert):
        return "success"
    return "failure"


def AddPayments(data):
    data_insert = db["Payments"].insert_one(data)
    if(data_insert):
        return "success"
    return "failure"

def getAllBookings(data):
    print(data)
    data = list(db["Bookings"].find({"trainName": data["trainName"],"date" : data["date"] }))
    print(data)
    if(data is not None):
        for d in data:
            d["_id"]=str(d["_id"])
    return data if data is not None else jsonify({"Success":False,"message":"No Tickets Found"})


def getAllTicketsOfUser(data):
    print(data)
    data = list(db["Tickets"].find({"userId": str(data.get('_id')) }))
    print(data)
    if(data is not None):
        for d in data:
            d["_id"]=str(d["_id"])
    return data if data is not None else jsonify({"Success":False,"message":"No Tickets Found"})