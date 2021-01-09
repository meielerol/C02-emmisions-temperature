drop table global_land_temperatures_by_major_city;

create table global_land_temperatures_by_major_city (
	dt varchar,
	average_temperature decimal,
	city varchar,
	country varchar,
	latitude decimal,
	longitude decimal
);

select * from global_land_temperatures_by_major_city;

select * from global_land_temperatures_by_major_city
where dt is null
	or average_temperature is null
	or city is null
	or country is null
	or latitude is null
	or longitude is null;
	
delete from global_land_temperatures_by_major_city
where dt is null
	or average_temperature is null
	or city is null
	or country is null
	or latitude is null
	or longitude is null;