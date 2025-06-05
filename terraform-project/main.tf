provider "aws" {
  region = "sa-east-1"
}

resource "aws_security_group" "web_sg" {
  name        = "web-security-group"
  description = "Allow SSH and HTTP access"

  ingress {
    from_port   = 22
    to_port     = 22
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"] # Replace with your IP range for security
  }

  ingress {
    from_port   = 3000
    to_port     = 3000
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"] # Replace with your IP range for security
  }

  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }
}

resource "aws_instance" "example" {
  ami           = "ami-0ba2a300055d11063" # Ubuntu 22.04 LTS
  instance_type = "t2.micro"
  key_name      =  aws_key_pair.tf_key_pair.key_name
  security_groups = [aws_security_group.web_sg.name]

  tags = {
    Name = "terraform-example-instance"
  }

  user_data = <<-EOF
    #!/bin/bash
    sudo apt-get update -y
    sudo apt-get install -y nodejs npm git
    sudo rm -rf /home/ubuntu/anime-website # Remove existing directory if it exists
    git clone https://github.com/nickodog/anime-website.git /home/ubuntu/anime-website
    "cd /home/ubuntu/anime-website"
    npm install
    npm run build
    nohup npm start &
  EOF

  provisioner "remote-exec" {
  inline = [
    "sudo apt-get update -y",
    "sudo apt-get install -y nodejs npm git",
    "sudo git clone https://github.com/nickodog/anime-website.git /home/ubuntu/anime-website",
    "sudo chown -R ubuntu:ubuntu /home/ubuntu/anime-website",
    "cd /home/ubuntu/anime-website",
    "sudo npm install",
    "sudo npm run build",
    "sudo nohup npm start &"
  ]
}

  connection {
    type        = "ssh"
    host        = self.public_ip
    user        = "ubuntu"
    private_key = tls_private_key.rsa.private_key_pem
  }
}



resource "local_file" "tf-key" {
  content  = tls_private_key.rsa.private_key_pem
  filename = "TerraFormServer.pem"
}

resource "tls_private_key" "rsa" {
  algorithm = "RSA"
  rsa_bits  = 4096
}

resource "aws_key_pair" "tf_key_pair" {
  key_name   = "TerraFormServer"
  public_key = tls_private_key.rsa.public_key_openssh
}

output "instance_public_ip" {
  value = aws_instance.example.public_ip
}