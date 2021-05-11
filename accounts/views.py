# accounts/views.py
from django.shortcuts import render
from django.contrib.auth.models import User  # 추가
from django.contrib import auth  # 추가
from django.shortcuts import redirect  # 추가
from .models import Profile

def signup(request):
    if request.method  == 'POST':
        if request.POST['password1'] == request.POST['password2']:
            user = User.objects.create_user(username=request.POST['username'], password=request.POST['password1'])
            auth.login(request, user)
            return redirect('/posts')

    return render(request, 'accounts/signup.html')

def edit(request):
    user = request.user
    if request.method == 'GET':
        return render(request, 'accounts/edit.html', {'user':user})
    
    elif request.method == 'POST':
        college = request.POST['college']
        major = request.POST['major']
        Profile.objects.filter(user=user).update(college=college, major=major)
        return redirect('/posts')
        