from fastapi import FastAPI
from fastapi.templating import Jinja2Templates
from flask import Flask, render_template, request, jsonify
import uvicorn
import LoginController
import StationsController
import TrainsController
from MongoConnectionHelper import connect_to_mongodb
import ScheduleController
import Bookings
from flask_cors import CORS


app = Flask(__name__)
#CORS(app,resources={r"/*": {"origins": "*"}})
CORS(app, origins='http://localhost:4200', supports_credentials=True)
# origins = [
#     "http://localhost.tiangolo.com",
#     "https://localhost.tiangolo.com",
#     "http://localhost",
#     "http://localhost:4200",
#     "http://localhost:8080",
# ]
# app.add_middleware(
#     CORSMiddleware,
#     allow_origins=origins,
#     allow_credentials=True,
#     allow_methods=["*"],
#     allow_headers=["*"],
# )
templates = Jinja2Templates(directory="templates")
@app.get('/getAllDetails/<string:email>')
def login(email):
    #data = request.get_json()
    
    user_type = LoginController.getAllUsersByEmail(email)
    
    return user_type
@app.post('/register')
def Register():
    print("request")
    data = request.get_json()
    print(data)
    register = LoginController.Register(data)
    if register:
        return jsonify({"Success": True})
    else:
        return jsonify({"Success":False,"message":"Unable to register! Please contact Admin"})
@app.get('/getAllStations')
def getAllStations():
    stations = StationsController.getAllStations()
    return stations
@app.post('/updateStation')
def updateStations():
    data = request.get_json()
    stations = StationsController.UpdateStations(data)
    return jsonify({"Success": True}) if stations else jsonify({"Success": False})
@app.post('/addStation')
def addStations():
    data = request.get_json()
    
    stations = StationsController.AddStations(data)
    return jsonify({"Success": True}) if stations else jsonify({"Success": False})

@app.get('/getAllTrains')
def getAllTrains():
    trains = TrainsController.getAllTrains()
    return trains
@app.post('/updateTrain')
def updateTrains():
    data = request.get_json()
    trains = TrainsController.UpdateTrains(data)
    return jsonify({"Success": True}) if trains else jsonify({"Success": False})
@app.post('/addTrain')
def addTrains():
    data = request.get_json()   
    trains = TrainsController.AddTrains(data)
    return jsonify({"Success": True}) if trains else jsonify({"Success": False})
@app.post('/searchTrain')
def SearchTrains():
    data = request.get_json()   
    trains = TrainsController.SearchTrains(data)
    return trains if not None else jsonify({"message":"Not Found"}) 
@app.post('/addSchedule')
def addSchedule():
    data = request.get_json()   
    trains = ScheduleController.AddSchedule(data)
    return jsonify({"Success": True}) if trains else jsonify({"Success": False})

@app.get('/getAllSchedules')
def getAllSchedules():
       
    schedules = ScheduleController.GetAllSchedules()
    return schedules if not None else jsonify({"message":"No Schedule Found"})


@app.post('/getAllTicketsOfUser')
def getAllTicketsOfUser():
    data = request.get_json()
    schedules = Bookings.getAllTicketsOfUser(data)
    return schedules if not None else jsonify({"message":"No Schedule Found"})


@app.post('/getAllBookings')
def getAllBookings():
    data = request.get_json()
    bookings = Bookings.getAllBookings(data)
    return bookings if not None else jsonify({"message":"No Schedule Found"})

@app.post('/getSchedulesBySearch')
def getSchedulesBySearch():
     data = request.get_json()
     schedules = ScheduleController.GetSchedulesWithSearch(data)
     return schedules if not None else jsonify({"message":"Not Found"}) 

@app.post('/updateSchedule')
def updateSchedule():
    data = request.get_json()
    schedules = ScheduleController.UpdateSchedules(data)
    return jsonify({"Success": True}) if not None else jsonify({"message": "Not Found"})

@app.post('/addBooking')
def addBooking():
    data = request.get_json()
    bookings = Bookings.AddBooking(data)
    return jsonify({"Success": True, "inserted_id": bookings}) if not None else jsonify({"message": "Not Found"})

@app.post('/addPayments')
def addPayments():
    data = request.get_json()
    payments = Bookings.AddPayments(data)
    return jsonify({"Success": True}) if not None else jsonify({"message": "Not Found"})

@app.post('/addTickets')
def addTickets():
    data = request.get_json()
    tickets = Bookings.AddTickets(data)
    return jsonify({"Success": True }) if not None else jsonify({"message": "Not Found"})

@app.post('/updateTickets')
def updateTickets():
    data = request.get_json()
    tickets = ScheduleController.UpdateTicket(data)
    return jsonify({"Success": True }) if not None else jsonify({"message": "Not Found"})

@app.get('/getAllTickets')
def getAllTickets():
       
    tickets = ScheduleController.GetAllTickets()
    return tickets if not None else jsonify({"message":"No Schedule Found"})

@app.route('/')
def root():
  return templates.TemplateResponse("index.html", {"request": request})


if __name__ == "__main__":
    #uvicorn.run("Main:app", host="127.0.0.1", port="5000",reload=False,log_level="info")
    app.run(port=5000,debug=True)
