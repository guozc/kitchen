# -*- coding: UTF-8 -*- 
import models
from extensions import db
import copy
import uuid


class Dish(db.Model):
	__tablename__ = 'dishes'

	id = db.Column(db.Integer, primary_key=True,autoincrement=True)
	name = db.Column(db.String(1024),nullable=True)
	main = db.Column(db.String(2048),nullable=True)
	mix = db.Column(db.String(2048),nullable=True)
	star = db.Column(db.Integer,nullable=True)
	step = db.Column(db.String(2048),nullable=True)
	dtype = db.Column(db.Integer,nullable=True)
	cost = db.Column(db.Integer,nullable=True)
	ismeat = db.Column(db.Integer,nullable=True)
	ability = db.Column(db.Integer,nullable=True)
	spicy = db.Column(db.Integer,nullable=True)
	pic = db.Column(db.String(128),nullable=True)
	desc = db.Column(db.String(2048),nullable=True)
	picked = db.Column(db.Integer,nullable=True)
	active = db.Column(db.String(32),nullable=True,default=1)


	def __repr__(self):
			return '<Dish %s>' % self.name

	def to_json(self):
		dict = copy.copy(self.__dict__)
		if "_sa_instance_state" in dict:
			del dict["_sa_instance_state"]
		return dict

class Order(db.Model):
	__tablename__ = 'dishes_order'

	id = db.Column(db.Integer, primary_key=True,autoincrement=True)
	status = db.Column(db.Integer, nullable=True, default=0) #订单状态 0 无效 1 待确认 2 已完成
	invite = db.Column(db.String(32), nullable=True)
	date = db.Column(db.String(32), nullable=True) #xxxx-xx-xx
	interval = db.Column(db.Integer,nullable=True, default=0) #时间 0 午餐 1 晚餐
	dishes = db.Column(db.String(1204),nullable=True) #1,2,3,4,5,6


	def __repr__(self):
			return '<Order %s>' % self.id

	def to_json(self):
		dict = copy.copy(self.__dict__)
		if "_sa_instance_state" in dict:
			del dict["_sa_instance_state"]
		return dict

class OrderUser(db.Model):
	__tablename__ = 'dishes_order_user'

	id = db.Column(db.Integer, primary_key=True,autoincrement=True)
	oid = db.Column(db.Integer,nullable=True) #订单id
	uid = db.Column(db.String(128),nullable=True) #用户openid
	avatar = db.Column(db.String(1024),nullable=True)
	name = db.Column(db.String(1024),nullable=True) #用户名称base64
	did = db.Column(db.Integer,nullable=True) #菜品id
	pic = db.Column(db.String(1024),nullable=True) #菜品图片
	dname = db.Column(db.String(1024),nullable=True) #菜品名称

	def __repr__(self):
			return '<OrderUser %s>' % self.id

	def to_json(self):
		dict = copy.copy(self.__dict__)
		if "_sa_instance_state" in dict:
			del dict["_sa_instance_state"]
		return dict