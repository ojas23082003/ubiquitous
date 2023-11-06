from django.db import models
from django.contrib.auth.models import User

# Create your models here.
class Profile(models.Model):
    id = models.BigAutoField(primary_key=True)
    first_name = models.CharField(max_length=255)
    last_name = models.CharField(max_length=255)
    dob = models.DateField()
    gender = models.CharField(max_length=255)
    time_stamp = models.DateField()
    is_sad = models.BooleanField(default=False)
    user = models.ForeignKey(User,null=True,blank=True,on_delete=models.CASCADE)

    def __str__(self):
        return str(self.first_name + " " + self.last_name + "-" + str(self.time_stamp))