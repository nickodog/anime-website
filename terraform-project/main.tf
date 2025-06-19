provider "aws" {
  region = "sa-east-1"
}

resource "tls_private_key" "rsa" {
  algorithm = "RSA"
  rsa_bits  = 4096
}

resource "aws_key_pair" "tf_key_pair" {
  key_name   = "TerraFormServer"
  public_key = tls_private_key.rsa.public_key_openssh
}

resource "aws_security_group" "web_sg" {
  name        = "web-security-group"
  description = "Allow SSH and HTTP access"

  ingress {
    from_port   = 22
    to_port     = 22
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  ingress {
    from_port   = 3000
    to_port     = 3000
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }
}

resource "aws_instance" "example" {
  ami           = "ami-0ba2a300055d11063" # Ubuntu 22.04
  instance_type = "t2.micro"
  key_name      = aws_key_pair.tf_key_pair.key_name
  security_groups = [aws_security_group.web_sg.name]

  tags = {
    Name = "terraform-example-instance"
  }

  connection {
    type        = "ssh"
    host        = self.public_ip
    user        = "ubuntu"
    private_key = tls_private_key.rsa.private_key_pem
  }

  provisioner "file" {
    content     = tls_private_key.rsa.private_key_pem
    destination = "/home/ubuntu/TerraFormServer.pem"
  }
}

resource "local_file" "tf_key" {
  content  = tls_private_key.rsa.private_key_pem
  filename = "${path.module}/TerraFormServer.pem"
}

output "instance_public_ip" {
  value = aws_instance.example.public_ip
}