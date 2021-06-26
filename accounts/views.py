# accounts/views.py
from django.shortcuts import render
from django.contrib.auth.models import User  # 추가
from django.contrib import auth  # 추가
from django.shortcuts import redirect  # 추가
from .models import Profile, EtlClass
from webCrawl.main import get_etl_classes

def signup(request):
  if request.method  == 'POST':
    if request.POST['password1'] == request.POST['password2']:
      user = User.objects.create_user(username=request.POST['username'], password=request.POST['password1'])
      auth.login(request, user)
      return redirect('/posts')

  return render(request, 'accounts/signup.html')

def edit(request):
  if request.method == 'POST':
    college = request.POST['college']
    major = request.POST['major']
    Profile.objects.filter(user=user).update(college=college, major=major)
    return redirect('/posts')
  
  etlclasses = EtlClass.objects.filter(user=request.user)
  return render(request, 'accounts/edit.html', {"etlclasses": etlclasses})

def sync_etl(request):
  EtlClass.objects.filter(user=request.user).delete()
  
  etl_classes = get_etl_classes(request.POST['etl_username'], request.POST['etl_password'])
  
  EtlClass.objects.bulk_create([
    EtlClass(user=request.user, name=etl_class) for etl_class in etl_classes
  ])

  return redirect('edit')
