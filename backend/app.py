# A simple Flask API that returns a JSON message.
from flask import Flask, jsonify

app = Flask(__name__)

@app.route('/')
def home():
    # Return a JSON response when the root endpoint is hit.
    return jsonify(message="Hello from Backend!")

if __name__ == '__main__':
    # Run the app on all available IPs on port 5000.
    app.run(host='0.0.0.0', port=5000)
