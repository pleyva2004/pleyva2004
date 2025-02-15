from flask import Flask, render_template, send_from_directory
import os

app = Flask(__name__, static_url_path='')

# Serve static files from the current directory
@app.route('/')
def root():
    return send_from_directory('.', 'index.html')

@app.route('/flower.html')
def flower():
    return send_from_directory('.', 'flower.html')

@app.route('/css/<path:path>')
def send_css(path):
    return send_from_directory('css', path)

@app.route('/js/<path:path>')
def send_js(path):
    return send_from_directory('js', path)

@app.route('/images/<path:path>')
def send_images(path):
    return send_from_directory('images', path)

if __name__ == '__main__':
    # Make sure we're in the right directory
    os.chdir(os.path.dirname(os.path.abspath(__file__)))
    app.run(debug=True, port=5000)