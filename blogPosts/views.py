from django.shortcuts import render, redirect
from .models import Post

# Create your views here.
def index(request):
    if request.method == 'GET':
        posts = Post.objects.all()
        return render(request, 'blogPosts/index.html', {'posts': posts})
    elif request.method == 'POST':
        title = request.POST['title']
        content = request.POST['content']
        Post.objects.create(title=title, content=content)
        return redirect('blogPosts:index')
    # posts = Post.objects.all()
    # return render(request, 'blogPosts/index.html', {'posts': posts})

def new(request):
    return render(request, 'blogPosts/new.html')

def show(request, id):
    post = Post.objects.get(id=id)
    return render(request, 'blogPosts/show.html', {'post':post})

def delete(request, id):
    post = Post.objects.get(id=id)
    post.delete()
    return redirect('blogPosts:index')
    # redirect index로 가면 get을 타서 다시 내용을 볼 수 있음