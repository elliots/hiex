# This file converts the NaturalEarth data to topojson,
# with singapore in high resolution (1:10), and the rest in lower (1:50)

ogr2ogr \
  -f GeoJSON \
  -where "adm0_a3 IN ('SGP')" \
  hires.geojson \
  ne_10m_admin_0_map_subunits.shp

ogr2ogr \
  -f GeoJSON \
  -where "adm0_a3 IN ('AUS', 'CHN', 'IND', 'IDN', 'MYS', 'PNG', 'THA')" \
  lowres.geojson \
  ne_50m_admin_0_map_subunits.shp

topojson \
  --id-property su_a3 \
  -p name=NAME \
  -p name \
  -o ../app/map.topojson \
  hires.geojson \
  lowres.geojson
