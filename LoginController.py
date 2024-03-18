from flask import jsonify
from MongoConnectionHelper import connect_to_mongodb
try:
    db = connect_to_mongodb()
except:
    print("unable to connect or already in running state")

def getAllUsersByEmail(email):

    data = db["Customers"].find_one({"email":email})
    
    if(data is None):
        data = db["Admins"].find_one({"email":email})
        if(data is not None):
            data["isAdmin"] = 1
            data["isCustomer"]=0
    else:
        data["isAdmin"] = 0
        data["isCustomer"]=1
    
    print(data)
    if(data is not None):
        data["_id"] = str(data["_id"])
    
    

    return data if data is not None else jsonify({"Success":False,"message":"No Details Found!"})
def Register(data):
    customers_collection  = db["Customers"]

    data_insert = customers_collection.insert_one(data)
    if(data_insert):
        return "success"
    return None

