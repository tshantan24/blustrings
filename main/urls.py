from django.urls import path
from . import views


app_name = 'main'  # here for namespacing of urls.

urlpatterns = [
    path("", views.homepage, name="homepage"),
    path("email/", views.email, name="email"),
    path("contact/", views.contact, name="contact"),
    path("contact/test/", views.handleMessages, name="handleMessages"),
]