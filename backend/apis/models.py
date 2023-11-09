from django.db import models
from django.contrib.auth.models import User

# Create your models here.
class History(models.Model):
    time_stamp = models.DateField()
    is_sad = models.BooleanField(default=False)
    
    def __str__(self):
        return str(self.time_stamp)
class Profile(models.Model):
    dob = models.DateField(null=True,blank=True)
    gender = models.CharField(max_length=255,null=True,blank=True)
    user = models.ForeignKey(User,null=True,blank=True,on_delete=models.CASCADE)
    history = models.ManyToManyField(History)
    phone = models.BigIntegerField(null=True,blank=True)

    def __str__(self):
        return str(self.user.first_name + " " + self.user.last_name)