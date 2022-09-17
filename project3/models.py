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


class healthsites_v(db.Model):
    __tablename__ = 'healthsites_v'

   
    lat             = db.Column(db.Float)
    lon             = db.Column(db.Float) 
    completeness    = db.Column(db.Integer) 
    loc_amenity     = db.Column(db.String(64))
    access_hours    = db.Column(db.String(64))
    addr_postcode   = db.Column(db.String(64))
    meta_healthcare = db.Column(db.String(64))
    loc_name        = db.Column(db.String(64))
    state           = db.Column(db.String(64))
    abbreviation    = db.Column(db.String(64))
    osm_id          = db.Column(db.Integer, primary_key=True)

    def __repr__(self):
        return '<healthsites_v %r>' % (self.name)


class meta_operators_v(db.Model):
    __tablename__ = 'meta_operators_v'

   
    state           = db.Column(db.String(64))
    statecode       = db.Column(db.String(64))
    type            = db.Column(db.String(64))  
    lat             = db.Column(db.Float)
    lon             = db.Column(db.Float) 
    completeness    = db.Column(db.Integer) 
    loc_amenity     = db.Column(db.String(64))
    access_hours    = db.Column(db.String(64))
    addr_postcode   = db.Column(db.String(64))
    loc_name        = db.Column(db.String(64))
    state           = db.Column(db.String(64))
    meta_operator   = db.Column(db.String(64))  
    meta_speciality = db.Column(db.String(64))  
    meta_emergency  = db.Column(db.String(64))  
    contact_url     = db.Column(db.String(64))  
    meta_operator_type  = db.Column(db.String(64))  
    contact_phone   = db.Column(db.String(64))  
    meta_wheelchair = db.Column(db.String(64))  
    address         = db.Column(db.String(64))    
    osm_id          = db.Column(db.Integer, primary_key=True)

    def __repr__(self):
        return '<meta_operators_v %r>' % (self.name)        