# -*- coding: utf-8 -*-

from .models import Message
from django.conf import settings
from django.template import Context
from django.shortcuts import render
from django.http import JsonResponse
from django.template.loader import get_template
from django.core.mail import EmailMultiAlternatives, send_mail


# Create your views here.
def homepage(request):
    return render(request = request,
                  template_name='main/index.html',)
                #   context = {"tutorials":Tutorial.objects.all})


def handleMessages(request):

    data = {
        'err_msg': ''
    }
    
    try:

        if request.method == "GET":

            name = request.GET.get('name')
            company = request.GET.get('company')
            email = request.GET.get('email')
            phone = request.GET.get('phone')
            # message = request.GET.get('message')

            print('-------------------')
            print(name)
            print(company)
            print(email)
            print(phone)
            # print(message)

            if company == "":
                company = "Individual"

            new_msg = Message(name=name, company=company, email=email, phone=phone)#, message=message)
            new_msg.save()
            print("Message has been saved.")
            data['err_msg'] = "Thank you for contacting us! Please wait for us to get back to you."
            # print('err msg should be positive')

            sendEmail(name, email)
            # send_mail( subject, email_message, email_from, recipient_list )
            print("Email has been sent successfully")

            send_mail(
                "New user has contacted us: {}".format(company),
                "Name: {} \nCompany: {} \nEmail: {} \nPhone: {}".format(name, company, email, phone),
                "hello@blustrings.com",
                ["hello@blustrings.com"],
            )
    
    except Exception as e:
        print("Exception occured: {}".format(e))
        data['err_msg'] = str(e)

    return JsonResponse(data)


def sendEmail(name, to):

    # plaintext = get_template('main/email.txt')
    htmly = get_template('main/email.html')
    d = { 'name': name }

    subject = 'Thank you for contacting Blustrings Entertainment!'
    email_message = """Hello {}, \n
                    Thank-you for visiting our website and reaching out to us.
                    Our executive is presently working on being prepared with as much data as one could grab from your company’s online presence. This way, we will most likely have an on-point conversation with you, discussing your specific requirements from our wide scope of services that we provide.
                    We thank-you for your patience to bear with us until we get back to you, at the earliest.
                    Hope you have a nice day ahead.""".format(name)

    html_content = htmly.render(d)
    email_from = "Blustrings <"+str(settings.EMAIL_HOST_USER)+">"

    msg = EmailMultiAlternatives(subject, email_message, email_from, [to])
    msg.attach_alternative(html_content, "text/html")
    msg.send()
