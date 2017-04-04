BEGIN;

-- CREATE TABLE "london_samples" -------------------------------
DROP TABLE IF EXISTS "support"."tfl_sites";
CREATE TABLE "support"."tfl_sites" ( 
	"id" INTEGER NOT NULL,
	"borough" CHARACTER VARYING( 128 ),
	"name" CHARACTER VARYING( 128 ),
	"geom" "public"."geometry" DEFAULT NULL,
	PRIMARY KEY ( "id" ) );
 ;
-- -------------------------------------------------------------

-- CREATE INDEX "london_sample_idx" ----------------------------
CREATE INDEX "tfl_sites_idx" ON "support"."tfl_sites" USING gist( "geom" );
-- -------------------------------------------------------------



INSERT INTO support.tfl_sites ("id", "borough", "name", "geom") VALUES (
    1,
    'Harrow',
    'Canons Park',
    (SELECT st_buffer(st_transform(st_pointfromtext('POINT (-0.294750 51.609027)', 4326), 27700),800))
    );

INSERT INTO support.tfl_sites ("id", "borough", "name", "geom") VALUES (
    2,
    'Brent',
    'Queensbury Station',
    (SELECT st_buffer(st_transform(st_pointfromtext('POINT (-0.286293 51.594448)', 4326), 27700),800))
    );

INSERT INTO support.tfl_sites ("id", "borough", "name", "geom") VALUES (
    3,
    'Harrow',
    'Wealdstone',
    (SELECT st_buffer(st_transform(st_pointfromtext('POINT (-0.335957 51.593150)', 4326), 27700),800))
    );

INSERT INTO support.tfl_sites ("id", "borough", "name", "geom") VALUES (
    4,
    'Harrow',
    'Pinner',
    (SELECT st_buffer(st_transform(st_pointfromtext('POINT (-0.379523 51.592611)', 4326), 27700),800))
    );

INSERT INTO support.tfl_sites ("id", "borough", "name", "geom") VALUES (
    5,
    'Harrow',
    'Preston Road',
    (SELECT st_buffer(st_transform(st_pointfromtext('POINT (-0.290107 51.570622)', 4326), 27700),800))
    );

INSERT INTO support.tfl_sites ("id", "borough", "name", "geom") VALUES (
    6,
    'Harrow',
    'Reyners Lane',
    (SELECT st_buffer(st_transform(st_pointfromtext('POINT (-0.375051 51.575977)', 4326), 27700),800))
    );

INSERT INTO support.tfl_sites ("id", "borough", "name", "geom") VALUES (
    7,
    'Harrow',
    'South Hill Avenue',
    (SELECT st_buffer(st_transform(st_pointfromtext('POINT (-0.351351 51.564337)', 4326), 27700),800))
    );
    
INSERT INTO support.tfl_sites ("id", "borough", "name", "geom") VALUES (
    8,
    'Harrow',
    'Stanmore',
    (SELECT st_buffer(st_transform(st_pointfromtext('POINT (-0.300930 51.618313)', 4326), 27700),800))
    );    
COMMIT;

SELECT t1.plot_id, 
    t2.borough AS site_borough,
    t2.name AS site_area_name,
    t1.wkb_geometry AS geom, 
    t1.area_plot, 
    t1.total_footprint AS building_footprint, 
    t1.total_floor_surface, 
    t1.gsi, 
    t1.fsi AS far 
    FROM london_index.plot_index AS t1
    JOIN support.tfl_sites AS t2
    ON ST_within(st_centroid(t1.wkb_geometry), t2.geom);

