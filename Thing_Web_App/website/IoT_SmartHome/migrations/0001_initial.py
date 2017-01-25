# -*- coding: utf-8 -*-
# Generated by Django 1.10.3 on 2017-01-25 17:21
from __future__ import unicode_literals

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Light',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('time', models.DateTimeField()),
                ('value', models.CharField(max_length=5)),
            ],
        ),
        migrations.CreateModel(
            name='Room',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('description', models.CharField(max_length=250)),
                ('owner_name', models.CharField(max_length=250)),
                ('owner_surname', models.CharField(max_length=250)),
                ('avatar', models.FileField(upload_to='')),
            ],
        ),
        migrations.CreateModel(
            name='Temp',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('time', models.DateTimeField()),
                ('value', models.FloatField()),
                ('room', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='IoT_SmartHome.Room')),
            ],
        ),
        migrations.AddField(
            model_name='light',
            name='room',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='IoT_SmartHome.Room'),
        ),
    ]