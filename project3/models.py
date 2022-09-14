from .app import db


class statepostcodes(db.Model):
    __tablename__ = 'statepostcodes'

    state           = db.Column(db.String(250))
    abbreviation    = db.Column(db.String(10))
    postcode_low    = db.Column(db.Integer)  
    postcode_high   = db.Column(db.Integer) 

    def __repr__(self):
        return '<statepostcodes %r>' % (self.name)
