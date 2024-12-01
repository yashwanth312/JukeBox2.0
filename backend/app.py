from flask import Flask, jsonify, request
import requests
import pygame

app = Flask(__name__)


def MusicPlayer(song, url) :
    pygame.mixer.init()
    if song == "bw" : 
        song_path = "./Music/BW.mp3"
    if song == "il":
        song_path = "./Music/IL.mp3"
    if song == "pv":
        song_path = "./Music/PV.mp3"

    # requests.get(url)
    pygame.mixer.music.load(song_path)
    pygame.mixer.music.play()

@app.route('/success', methods=['GET'])
def success():

    s_value = request.args.get('s')

    response_data = []

    if s_value == "bw":
        external_url = "http://172.28.140.131?m=1&o=1"
    if s_value == "il":
        external_url = "http://172.28.140.132?m=1&o=1"
    if s_value == "pv":
        external_url = "http://172.28.140.15?m=1&o=1"


    if s_value : 
        MusicPlayer(s_value, external_url)
        response_data.append("Processed")

    return jsonify({
        "result": response_data
    }), 200


if __name__ == '__main__':
    app.run(debug=True)

