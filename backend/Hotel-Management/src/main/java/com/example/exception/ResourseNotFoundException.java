package com.example.exception;

public class ResourseNotFoundException extends RuntimeException {
	public ResourseNotFoundException(String message) {
		super(message);
	}

}
