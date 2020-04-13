""" Algorithm to perform a comparison between the idea as input and the existing companies' descriptions  """

import nltk
from sklearn.feature_extraction.text import CountVectorizer
from sklearn.metrics.pairwise import cosine_similarity
import ideas_scripts.mine.ideas


# Computes cosine similarity
def get_cosine_sim(*strs):
    vectors = [t for t in get_vectors(*strs)]
    return cosine_similarity(vectors)


# Converts a collection of text documents to a matrix of token counts
def get_vectors(*strs):
    text = [t for t in strs]
    vectorizer = CountVectorizer(text)
    vectorizer.fit(text)
    return vectorizer.transform(text).toarray()


# Removes non-alphabetical characters
def clean(description):
    words = nltk.word_tokenize(description)
    words = [word.lower() for word in words if word.isalpha()]
    lemmatizer = nltk.WordNetLemmatizer()
    tokens = [lemmatizer.lemmatize(token) for token in words]
    stopwords = nltk.corpus.stopwords.words('english')
    tokens = [token for token in tokens if token not in stopwords]
    return " ".join(tokens)


# Compares ideas and returns similarity percentage
def compare(new_idea, description):
    # If for some reason it returns none, just return 0%
    if description is None:
        return 0
    return (
            get_cosine_sim(new_idea, description)[0][1] * 100
    )


# Returns True for an impressive idea and False for a bad idea and the reason if False
def idea_check(user_input):
    user_input = clean(user_input)
    highest = 0
    name, reason = ('', '')
    # Simple "find highest" algorithm
    data = ideas_scripts.mine.ideas.get_ideas()
    for i in data:
        # Data is in format {'name': XXX, 'description': XXX, 'reason': XXX}
        result = compare(i['description'], user_input)
        if result > highest:
            highest = result
            name = (i['name'])
            reason = (i['reason'])

    if (
            name == '' or highest < 20
    ):
        return True, "Congratulations, your idea is impressive!"
    else:
        reason = (
                "it seems like your idea is similar to another startup called "
                + name
                + ", which failed due to the following reason: "
                + """ 
                """
                + reason.lower()
        )

    return False, reason


def main():
    idea = input("Enter idea: ")
    print(idea_check(idea))


