terraform {
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 4.16"
    }
  }

  required_version = ">= 1.2.0"
}

provider "aws" {
  region  = "sa-east-1"
}

resource "aws_instance" "app_server" {
  ami           = "ami-0efbe79a4e1e1cade"
  instance_type = "t3.micro"

  tags = {
    Name = "Terraform-Server2"
  }
}
