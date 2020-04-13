from flask import Flask, request, render_template
from flask_cors import CORS, cross_origin
import algorithm

nltk.download("punkt")
nltk.download("wordnet")

app = Flask(__name__)
CORS(app, support_credentials=True)


@app.route('/api/results', methods=['POST'])
@cross_origin(support_credentials=True)
def get_idea():
    results = algorithm.idea_check(request.get_data().decode("utf8"))

    if results[0]:
        idea = "impressive"
        reason = ""
    else:
        idea = "bad"
        reason = results[1][0].upper() + results[1][1:] + "."

    return {"idea": idea, "reasons": reason}


@app.route('/')
@app.route("/index")
@app.route("/home")
def index(name=None):
    return render_template('layouts/index.html', name=name)


@app.errorhandler(404)
def page_not_found(error):
    return render_template('layouts/404_error.html'), 404


if __name__ == '__main__':
    app.run(host="0.0.0.0", port=8000)
