package com.application.angular.postgresql.controller;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import com.application.angular.postgresql.repository.ApplicationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.application.angular.postgresql.model.Application;

@CrossOrigin(origins = "http://localhost:8081")
@RestController
@RequestMapping("/api")
public class ApplicationController {

	@Autowired
	ApplicationRepository applicationRepository;

	@GetMapping("/applications")
	public ResponseEntity<List<Application>> getAllApplications(@RequestParam(required = false) String title) {
		try {
			List<Application> applications = new ArrayList<Application>();

			if (title == null)
				applicationRepository.findAll().forEach(applications::add);
			else
				applicationRepository.findByTitleContaining(title).forEach(applications::add);

			if (applications.isEmpty()) {
				return new ResponseEntity<>(HttpStatus.NO_CONTENT);
			}

			return new ResponseEntity<>(applications, HttpStatus.OK);
		} catch (Exception e) {
			return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

	@GetMapping("/applications/{id}")
	public ResponseEntity<Application> getApplicationById(@PathVariable("id") long id) {
		Optional<Application> applicationData = applicationRepository.findById(id);

		if (applicationData.isPresent()) {
			return new ResponseEntity<>(applicationData.get(), HttpStatus.OK);
		} else {
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}
	}

	@PostMapping("/applications")
	public ResponseEntity<Application> createApplication(@RequestBody Application application) {
		try {
			Application _application = applicationRepository
					.save(new Application(application.getTitle(), application.getDescription(), false));
			return new ResponseEntity<>(_application, HttpStatus.CREATED);
		} catch (Exception e) {
			return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

	@PutMapping("/applications/{id}")
	public ResponseEntity<Application> updateApplication(@PathVariable("id") long id, @RequestBody Application application) {
		Optional<Application> applicationData = applicationRepository.findById(id);

		if (applicationData.isPresent()) {
			Application _application = applicationData.get();
			_application.setTitle(application.getTitle());
			_application.setDescription(application.getDescription());
			_application.setPublished(application.isPublished());
			return new ResponseEntity<>(applicationRepository.save(_application), HttpStatus.OK);
		} else {
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}
	}

	@DeleteMapping("/applications/{id}")
	public ResponseEntity<HttpStatus> deleteApplication(@PathVariable("id") long id) {
		try {
			applicationRepository.deleteById(id);
			return new ResponseEntity<>(HttpStatus.NO_CONTENT);
		} catch (Exception e) {
			return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

	@DeleteMapping("/applications")
	public ResponseEntity<HttpStatus> deleteAllApplications() {
		try {
			applicationRepository.deleteAll();
			return new ResponseEntity<>(HttpStatus.NO_CONTENT);
		} catch (Exception e) {
			return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
		}

	}

	@GetMapping("/applications/published")
	public ResponseEntity<List<Application>> findByPublished() {
		try {
			List<Application> applications = applicationRepository.findByPublished(true);

			if (applications.isEmpty()) {
				return new ResponseEntity<>(HttpStatus.NO_CONTENT);
			}
			return new ResponseEntity<>(applications, HttpStatus.OK);
		} catch (Exception e) {
			return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

}
