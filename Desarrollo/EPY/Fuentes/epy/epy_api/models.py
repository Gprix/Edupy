import os
from django.db import models
from django.contrib.auth.models import AbstractUser
from django.dispatch import receiver

# Create your models here.
class User(AbstractUser):
    is_estudiante = models.BooleanField(default=False)
    is_profesor = models.BooleanField(default=False)
    valoracion = models.FloatField(default=0)

    tarifa = models.DecimalField(max_digits=8, decimal_places=2, default=0)

class Pregunta(models.Model):
    fecha = models.DateTimeField(auto_now_add=True)
    titulo = models.CharField(max_length=64)
    descripcion = models.TextField()
    editada = models.BooleanField(default=False)
    autor = models.ForeignKey(User, related_name='preguntas_publicadas', on_delete=models.CASCADE)
    # marcadores = models.ManyToManyField(User, related_name='preguntas_marcadas', blank=True)

    class Meta:
        ordering = ['-fecha']

class Archivo(models.Model):
    archivo = models.FileField()

@receiver(models.signals.post_delete, sender=Archivo)
def delete_file_on_delete(sender, instance, **kwargs):
    if instance.archivo:
        if os.path.isfile(instance.archivo.path):
            os.remove(instance.archivo.path)


class Estudiante(models.Model):
    usuario = models.OneToOneField(User, on_delete=models.CASCADE, primary_key=True)
    # valoracion = models.FloatField(default=0)

class Profesor(models.Model):
    usuario = models.OneToOneField(User, on_delete=models.CASCADE, primary_key=True)
    # tarifa = models.DecimalField(max_digits=8, decimal_places=2, default=0)
    # valoracion = models.FloatField(default=0)

class Sesion(models.Model):
    id_key = models.CharField(max_length=16, unique=True)
    participantes = models.ManyToManyField(User, related_name='participantes', blank=True)
    asunto = models.CharField(max_length=64, default="(Sin título)")
    nuevo = models.BooleanField(default=True)
    
    def __str__(self):
        return f"ID: {self.id_key} - {self.asunto}"

class Mensaje(models.Model):
    autor = models.ForeignKey(User, related_name='mensaje_enviado', on_delete=models.CASCADE)
    sesion = models.ForeignKey(Sesion, related_name='mensaje', on_delete=models.CASCADE)
    contenido = models.TextField()
    timestamp = models.DateTimeField(auto_now_add=True)
    # adjunto = models.ForeignKey(Archivo, related_name='mensaje_adjunto', on_delete=models.CASCADE)
    adjunto = models.FileField(blank=True)

    class Meta:
        ordering = ['timestamp']

class Reporte(models.Model):
    CATEGORIA_REPORTE = [
        ('BUG', 'Mal funcionamiento de la plataforma'),
        ('ABUSE', 'Comportamiento indebido de uno de los usuarios'),
        ('QUALITY', 'Insatisfacción con el servicio'),
        ('OTHER', 'Otros'),
    ]

    autor = models.ForeignKey(User, on_delete=models.CASCADE, related_name='autor_reporte')
    categoria = models.TextField(choices=CATEGORIA_REPORTE)
    descripcion = models.TextField()