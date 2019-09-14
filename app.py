import os

from flask import Flask
from flask import render_template
from flask import request
from flask import jsonify
from flask_migrate import Migrate
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy.exc import IntegrityError
from flask import make_response



project_dir = os.path.dirname(os.path.abspath(__file__))
database_file = 'sqlite:///{}'.format(os.path.join(project_dir, 'customer.db'))

app = Flask(__name__, template_folder='templates')
app.config['SQLALCHEMY_DATABASE_URI'] = database_file
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db = SQLAlchemy(app)
migrate = Migrate(app, db)

# class Cusotmer(db.Model):
#     username = db.Column(db.String(100), unique=True, nullable=False, primary_key=True)
#     full_name = db.Column(db.String(150), unique=True, nullable=False)
#     address = db.Column(db.String(300), nullable=False)
#     phone_number = db.Column(db.String(10), unique=True, nullable=False)

#     def __repr__(self):
#         return '<username: {}> :: <full_name: {}> :: <address: {}>'.format(self.title, self.full_name, self.address)

# This is the inventory of the stock.
class Item(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    number = db.Column(db.String(20), nullable=False)
    price_dollar = db.Column(db.Float, nullable=False)
    price_baht = db.Column(db.Float)
    #TODO Add relationship to customer

class ItemLookup(db.Model):
    number = db.Column(db.String(20), unique=True, nullable=False, primary_key=True)
    description = db.Column(db.String(100), nullable=True)


##
## Helper
def add_new_item(item):
    existed = ItemLookup.query.filter_by(number=item["itemNumber"]).all()
    if not existed:
        item = ItemLookup(number=item["itemNumber"])
        db.session.add(item)
        db.session.commit()
        return True
    return False

##
## API
@app.route('/api/v1.0/item', methods=['GET', 'POST'])
def item_api():
    new_items = set()
    if request.method == 'POST':
        for item in request.json:
            if add_new_item(item):
                new_items.add(item["itemNumber"])
    else:
        print('in get')
    new_items = list(new_items)
    if not new_items:
        return make_response("No new data", 200)
    return jsonify(new_items), 201


@app.route('/api/v1.0/hidden/delete/itemLookup', methods=['GET'])
def delete_item_lookup_api():
    [db.session.delete(m) for m in ItemLookup.query.all()]
    db.session.commit()
    return make_response("All Data deleted", 200)

##
## Webpage
@app.route('/item', methods=['GET', 'POST'])
def item():
    if request.method == 'POST':
        # Do post processing
        pass
    # Do get processing...
    return render_template('item.html')

@app.route('/user', methods=['GET', 'POST'])
def user():
    items = []
    for i in range(3):
        items.append(ItemLookup(number='FTest', description='testDescription_{}'.format(i)))

    for item in items:
        existed = ItemLookup.query.filter_by(number=item.number).all()
        print('in for loop')
        if not existed:
            print('no exited')
            db.session.add(item)
            db.session.commit()
        else:
            print('here')
            existed_item = existed[0]
            existed_item.description = 'Overruled'
            db.session.add(existed_item)
            db.session.commit()
    print('add completed')

    [print(i.number, i.description) for i in ItemLookup.query.all()]
    order_number = ['123', '456', '789']
    return render_template('contact.html', order_number=order_number)


if __name__=='__main__':
    app.run(debug=1)