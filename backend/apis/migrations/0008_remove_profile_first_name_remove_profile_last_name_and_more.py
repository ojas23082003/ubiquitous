# Generated by Django 4.2.7 on 2023-11-09 17:22

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('apis', '0007_remove_profile_is_sad_remove_profile_time_stamp'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='profile',
            name='first_name',
        ),
        migrations.RemoveField(
            model_name='profile',
            name='last_name',
        ),
        migrations.AlterField(
            model_name='profile',
            name='id',
            field=models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID'),
        ),
    ]
