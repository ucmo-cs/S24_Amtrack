from bson import ObjectId
from flask import jsonify
from MongoConnectionHelper import connect_to_mongodb
try:
    db = connect_to_mongodb()
except:
    print("unable to connect or already in running state")


def AddSchedule(data):
    data_insert = db["Schedule"].insert_one(data)
    if(data_insert):
        return "success"
    return "failure"

def GetAllSchedules():
    data = list(db["Schedule"].find({}))
    for d in data:
        d["_id"]=str(d["_id"])
    return data

def UpdateSchedules(data):   
    data_update = db["Schedule"].update_one({"_id":ObjectId(data["_id"])},
            {"$set":{"trainName":data.get('trainName'),
                     "startStation":data.get('startStation'),
                     "destinationStation":data.get('destinationStation'),
                     "startDay": data.get('startDay'),
                     "endDay":data.get('endDay'),
                     "startTime": data.get('startTime'),
                     "endTime": data.get('endTime'),
                     "stations":data.get('stations')}})
    if(data_update):
        return "success"
    return "failure"

def GetSchedulesWithSearch(data):
    query = {}
    if(data.get('trainName') is not None and data.get('trainName')!=''):
        query["trainName"]= data.get('trainName')
    # if(data.get('startStation') is not None and data.get('startStation')!=''):
    #     query["startStation"]= data.get('startStation')
    # if(data.get('destinationStation') is not None and data.get('destinationStation')!=''):
    #     query["destinationStation"]= data.get('destinationStation')
    if data.get('startStation'):
        query["$or"] = [
            {"startStation": data.get('startStation')},  # Checking start station
            {"stations.stationName": data.get('startStation')}  # Checking intermediate stations
        ]
    if data.get('destinationStation'):
        # query["destinationStation"] = data.get('destinationStation')
         query["$or"] = [
            {"destinationStation": data.get('destinationStation')},  # Checking start station
            {"stations.stationName": data.get('destinationStation')}  # Checking intermediate stations
        ]

    scheduleDetails = list(db["Schedule"].find(query))
    if(scheduleDetails is not None):
        for d in scheduleDetails:
            d["_id"]=str(d["_id"])
    return scheduleDetails if scheduleDetails is not None else jsonify({"Success":False,"message":"No Trains Found"})

def UpdateTicket(data):   
    data_update = db["Tickets"].update_one({"_id":ObjectId(data["_id"])},
            {"$set":{"status":"Cancelled"}})
    if(data_update):
        return "success"
    return "failure"

def GetAllTickets():
    data = list(db["Tickets"].find({}))
    for d in data:
        d["_id"]=str(d["_id"])
    return data
 