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



class statestats_v(db.Model):
    __tablename__ = 'statestats_v'

   
    state           = db.Column(db.String(64))
    statecode       = db.Column(db.String(64))
    type            = db.Column(db.String(64))  
    rowcount        = db.Column(db.Integer) 
    recordid        = db.Column(db.Integer, primary_key=True)

    def __repr__(self):
        return '<statestats_v %r>' % (self.name)
