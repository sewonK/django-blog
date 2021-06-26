from django.db import models
from django.utils import timezone
from django.contrib.auth.models import User
from django.db.models.signals import post_save
from django.dispatch import receiver

class Profile(models.Model):
	# user-profile 1대1 매칭, user.profile처럼 역으로도 가져올 수 있음
	# on_delete=models.CASCADE : user가 삭제되는 경우 Profile 객체도 같이 삭제된다.
	user = models.OneToOneField(User, on_delete=models.CASCADE)
	college = models.CharField(max_length=20, blank=True)
	major = models.CharField(max_length=20, blank=True)

	def __str__(self):
		return f'id={self.id}, user_id={self.user.id}, college={self.college}, major={self.major}'
	
	@receiver(post_save, sender=User)
	def create_user_profile(sender, instance, created, **kwargs):
		if created:
				Profile.objects.create(user=instance)
	
	@receiver(post_save, sender=User)
	def save_user_profile(sender, instance, **kwargs):
		instance.profile.save()

class EtlClass(models.Model):
	user = models.ForeignKey(User, on_delete=models.CASCADE)
	name = models.TextField()
	