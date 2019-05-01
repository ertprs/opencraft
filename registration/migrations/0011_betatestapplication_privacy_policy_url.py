# -*- coding: utf-8 -*-
# Generated by Django 1.10.7 on 2019-04-08 01:23
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('registration', '0010_betatestapplication_accepted_privacy_policy'),
    ]

    operations = [
        migrations.AddField(
            model_name='betatestapplication',
            name='privacy_policy_url',
            field=models.URLField(blank=True, default='', help_text='URL to the privacy policy.', verbose_name='URL to Privacy Policy'),
        ),
    ]
