from django.contrib import admin 
from .models import Post   # 추가
# admin을 통해 Post모델을 관리하겠다(admin페이지에서의 인식을 위함)
admin.site.register(Post)