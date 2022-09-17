import sqlalchemy
import os
import numpy as np
from sqlalchemy.ext.automap import automap_base
from sqlalchemy.orm import Session
from sqlalchemy import create_engine, func
import pandas as pd

from flask import Flask, jsonify,render_template


#################################################
# Flask Setup
#################################################
app = Flask(__name__)

#################################################
# Database Setup
#################################################

from flask_sqlalchemy import SQLAlchemy
app.config['SQLALCHEMY_DATABASE_URI'] = os.environ.get('DATABASE_URL', '') or "sqlite:///db.sqlite"

# Remove tracking modifications
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db = SQLAlchemy(app)

# flask setup


@app.route("/")
def home():
    return render_template("index.html")   


from .models import (statepostcodes, 
                     statestats_v, 
                     meta_operators_v as mv,
                     healthsites_v    as hv)




@app.route("/api/v0/healthsites")
def healthsites():

    l_list = []
    l_dict = {}  

    results = db.session.query(hv.lat, hv.lon, hv.osm_id, hv.completeness, hv.loc_amenity, hv.access_hours, 
                               hv.addr_postcode, hv.loc_name, hv.state, hv.meta_healthcare, hv.abbreviation).all()


    for i in range(len(results)):
             
        l_dict = {
                "lat"               : results[i][0],
                "lon"               : results[i][1],
                "osm_id"            : results[i][2],
                "completeness"      : results[i][3],
                "loc_amenity"       : results[i][4],
                "access_hours"      : results[i][5],
                "addr_postcode"     : results[i][6],
                "loc_name"          : results[i][7],
                "state"             : results[i][8],
                "meta_healthcare"   : results[i][9],
                "abbreviation"      : results[i][10]
            }

        l_list.append(l_dict)

    return jsonify(l_list)  



@app.route("/api/v0/metaoperators")
def metaoperators():

    l_list = []
    l_dict = {}  

    results = db.session.query(mv.lat, mv.lon, mv.osm_id, mv.completeness, mv.loc_amenity, mv.access_hours, 
                               mv.addr_postcode, mv.loc_name, mv.state, mv.meta_operator, mv.meta_speciality, 
                               mv.meta_emergency, mv.contact_url, mv.meta_operator_type, mv.contact_phone, 
                               mv.meta_wheelchair, mv.address).all()


    for i in range(len(results)):
             
        l_dict = {
                "lat"               : results[i][0],
                "lon"               : results[i][1],
                "osm_id"            : results[i][2],
                "completeness"      : results[i][3],
                "loc_amenity"       : results[i][4],
                "access_hours"      : results[i][5],
                "addr_postcode"     : results[i][6],
                "loc_name"          : results[i][7],
                "state"             : results[i][8],
                "meta_operator"     : results[i][9],
                "meta_speciality"   : results[i][10],
                "meta_emergency"    : results[i][11],
                "contact_url"       : results[i][12],
                "meta_operator_type"  : results[i][13],
                "contact_phone"     : results[i][14],
                "meta_wheelchair"   : results[i][15],
                "address"           : results[i][16]
            }

        l_list.append(l_dict)

    return jsonify(l_list)  




@app.route("/api/v0/statestats")
def statestats():

    l_list = []
    l_dict = {}

    
    results = db.session.query(statestats_v.state, statestats_v.statecode, statestats_v.type, statestats_v.rowcount).all()

    for i in range(len(results)):
             
        l_dict = {
                "state"     : results[i][0],
                "statecode" : results[i][1],
                "type"      : results[i][2],
                "rowcount"  : results[i][3]
            }

        l_list.append(l_dict)

    return jsonify(l_list)  






@app.route("/api/v0/states")
def states():

    l_list = []
    l_dict = {}

    results = db.session.query(statepostcodes.state, statepostcodes.abbreviation, statepostcodes.postcode_low).all()
   
    
    for i in range(len(results)):
        
        
        l_dict = {
                "state": results[i][0],
                "statecode": results[i][1],
                "postcode": results[i][2]
            }

        l_list.append(l_dict)

    return jsonify(l_list)  
    

if __name__ == '__main__':
    app.run(debug=True)