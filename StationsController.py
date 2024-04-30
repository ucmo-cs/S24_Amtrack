from bson import ObjectId
from flask import jsonify
from MongoConnectionHelper import connect_to_mongodb
try:
    db = connect_to_mongodb()
except:
    print("unable to connect or already in running state")

def getAllStations():
    data = list(db["Stations"].find({}))
    print(data)
    if(data is not None):
        for d in data:
            d["_id"]=str(d["_id"])
    return data if data is not None else jsonify({"Success":False,"message":"No Stations Found"})
def AddStations(data):
    data_insert = db["Stations"].insert_one(data)
    if(data_insert):
        return "success"
    return "failure"
def UpdateStations(data):    
    data_update = db["Stations"].update_one({"_id":ObjectId(data["_id"])},{"$set":
                                                                           
                                                                           {"stationName":data.get('stationName'),
                                                                            "location":data.get('location'),
                                                                            "phoneNumber": data.get('phoneNumber'),
                                                                            "city": data.get('city'),
                                                                            "state": data.get('state')}})
    if(data_update):
        return "success"
    return "failure"
    


    