from .app import db


class statepostcodes(db.Model):
    __tablename__ = 'statepostcodes'

    state           = db.Column(db.String(250))
    abbreviation    = db.Column(db.String(10))
    postcode_low    = db.Column(db.integer)  
    postcode_high   = db.Column(db.integer) 

    def __repr__(self):
        return '<statepostcodes %r>' % (self.name)
