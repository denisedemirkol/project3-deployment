from .app import db


class statepostcodes(db.Model):
    __tablename__ = 'statepostcodes'

    recordid        = db.Column(db.Integer, primary_key=True)
    state           = db.Column(db.String(64))
    abbreviation    = db.Column(db.String(64))
    postcode_low    = db.Column(db.Integer)  
    postcode_high   = db.Column(db.Integer) 

    def __repr__(self):
        return '<statepostcodes %r>' % (self.name)
