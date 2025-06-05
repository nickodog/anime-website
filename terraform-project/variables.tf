variable "region" {
  description = "Região AWS onde os recursos serão criados"
  type        = string
  default     = "sa-east-1"
}

variable "instance_type" {
  description = "tipo de EC2"
  type        = string
  default     = "t3.micro"
}

variable "ami" {
  description = "AMI ID"
  type        = string
  default     = "ami-0efbe79a4e1e1cade"
}