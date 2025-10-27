from flask import Flask, render_template, request, jsonify, redirect, url_for, session

app = Flask(__name__)

@app.route("/send_data")
def send_data():
    if request.method == "POST":
        js_obj = request.get_json()
        session['data'].append(js_obj)

@app.route("/recieve_data")
def recieve_data():
    return session['data']