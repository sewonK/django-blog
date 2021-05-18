from django.shortcuts import render, redirect
from .models import Post, Comment, Like, LikeComment
from django.contrib.auth.models import User
from tags.models import Tag
from accounts.models import Profile
from django.db.models import Count
import operator

def index(request):
    if request.method == 'GET':
        posts = Post.objects.all().order_by('-created_at')
        tags = Tag.objects.all()
        colleges = Profile.objects.values('college').annotate(count=Count('college')).order_by('-count')
        collegeFriends = None
        majorFriends = None
        if request.user.is_authenticated :
            collegeFriends = User.objects.filter(profile__college=request.user.profile.college).exclude(username=request.user.username)
            majorFriends = User.objects.filter(profile__major=request.user.profile.major).exclude(username=request.user.username)          
        return render(request, 'blogPosts/index.html', {'posts': posts, 'colleges':colleges, 'tags': tags, 'collegeFriends':collegeFriends, 'majorFriends':majorFriends})
        
    elif request.method == 'POST':
        title = request.POST['title']
        content = request.POST['content']
        post = Post.objects.create(title=title, content=content, author=request.user)
        post.tags.set(request.POST.getlist('tags'))
        return redirect('blogPosts:index')

def new(request):
    tags = Tag.objects.all()
    return render(request, 'blogPosts/new.html', {'tags': tags})

def show(request, id):
    if request.method == 'GET':
        post = Post.objects.get(id=id)
        comments = Comment.objects.filter(post=post).annotate(count=Count('like_users')).order_by('-count')
        tags = Tag.objects.filter(posts=post)
        return render(request, 'blogPosts/show.html', {'post':post, 'tags':tags, 'comments':comments})
    elif request.method == 'POST':
        title = request.POST['title']
        content = request.POST['content']
        post = Post.objects.filter(id=id)
        post.update(title=title, content=content)
        post.first().tags.set(request.POST.getlist('tags'))
        return redirect('blogPosts:show', id)

def delete(request, id):
    post = Post.objects.get(id=id)
    post.delete()
    return redirect('blogPosts:index')
    
def update(request, id):
    post = Post.objects.get(id=id)
    tags = Tag.objects.all()
    return render(request, 'blogPosts/update.html', {'post':post, 'tags': tags})

class CommentView:
    def create(request, id):
        content = request.POST['content']
        Comment.objects.create(post_id=id, content=content, author=request.user)
        return redirect(f'/posts/{id}')
        
    def delete(request, id, cid):
        comment = Comment.objects.get(id=cid)
        comment.delete()
        return redirect(f'/posts/{id}')
    
    def like(request, id, cid):
        comment = Comment.objects.get(id=cid)
        like_list = comment.likecomment_set.filter(user_id=request.user.id)
        if like_list.count() > 0:
            comment.likecomment_set.get(user=request.user).delete()
        else:
            LikeComment.objects.create(user=request.user, comment=comment)
        return redirect(f'/posts/{id}')

class LikeView:
    def create(request, id):
        post = Post.objects.get(id=id)
        like_list = post.like_set.filter(user_id=request.user.id)
        if like_list.count() > 0:
            post.like_set.get(user=request.user).delete()
        else:
            Like.objects.create(user=request.user, post=post)
        return redirect (request.META.get('HTTP_REFERER'))
