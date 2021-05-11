from django.shortcuts import render, redirect
from .models import Post
from django.contrib.auth.models import User
import operator

# Create your views here.
def index(request):
    if request.method == 'GET':
        posts = Post.objects.all()
        users = User.objects.all()
        colleges = dict()
        for user in users:
            if (user.profile.college != "") and (user.profile.college not in colleges):
                colleges[user.profile.college] = 0
            if user.profile.college in colleges:
                colleges[user.profile.college] += 1
        colleges = sorted(colleges.items(), key=operator.itemgetter(1), reverse=True)
        if request.user.is_authenticated :
            collegeFriends = User.objects.filter(profile__college=request.user.profile.college).exclude(username=request.user.username)
            majorFriends = User.objects.filter(profile__major=request.user.profile.major).exclude(username=request.user.username)  
            return render(request, 'blogPosts/index.html', {'posts': posts, 'colleges':colleges, 'collegeFriends':collegeFriends, 'majorFriends':majorFriends})
        else :
            return render(request, 'blogPosts/index.html', {'posts': posts, 'colleges':colleges})
    elif request.method == 'POST':
        title = request.POST['title']
        content = request.POST['content']
        Post.objects.create(title=title, content=content)
        return redirect('blogPosts:index')

def new(request):
    return render(request, 'blogPosts/new.html')

def show(request, id):
    if request.method == 'GET':
        post = Post.objects.get(id=id)
        return render(request, 'blogPosts/show.html', {'post':post})
    elif request.method == 'POST':
        title = request.POST['title']
        content = request.POST['content']
        Post.objects.filter(id=id).update(title=title, content=content)
        return redirect('blogPosts:show', id)

def delete(request, id):
    post = Post.objects.get(id=id)
    post.delete()
    return redirect('blogPosts:index')
    
def update(request, id):
    post = Post.objects.get(id=id)
    return render(request, 'blogPosts/update.html', {'post':post})
