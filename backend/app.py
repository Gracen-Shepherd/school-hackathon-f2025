from flask import Flask, render_template, request, jsonify, redirect, url_for, session
from flask_cors import CORS
import json

app = Flask(__name__)
CORS(app)
app.config['SECRET_KEY'] = 'pastaballsinpastasoup'
DATA_FILE = 'data.json'

@app.route("/send_data", methods=["POST","OPTIONS"])
def send_data():
    if request.method == "POST":
        js_obj = request.get_json()
        print(f"wowie the obj is {js_obj}")

        currentfile = []

        try:
            with open(DATA_FILE, 'r') as file:
                currentfile = json.load(file)
                counter = currentfile[-1]['id'] + 1
        except(FileNotFoundError, json.JSONDecodeError):
            currentfile = []
            counter = 0

        currentfile.append(js_obj)
        currentfile[-1]['id'] = counter

        with open(DATA_FILE, 'w') as file:
            json.dump(currentfile, file, indent=2)

        return jsonify({'message': "Data received"}), 200
    else:
        # OPTIONS handled by CORS
        return "", 200

@app.route("/receive_data")
def receive_data():
    try:
        with open(DATA_FILE, 'r') as file:
            data = json.load(file)
            return jsonify(data), 200
    except(FileNotFoundError, json.JSONDecodeError):
        return "", 200  # TODO: proper error handle here

if __name__ == '__main__':
    app.run(debug=True)
