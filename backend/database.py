from flask_pymongo import PyMongo

# Create a global MongoDB instance
mongo = PyMongo()

def init_db(app):
    app.config[
        'MONGO_URI'] = 'mongodb+srv://smartpaddy:MsgRuU4dHZ7pJQ5d@cluster0.wbakw.mongodb.net/smartpaddy?retryWrites=true&w=majority&appName=Cluster0'
    mongo.init_app(app)

    return mongo