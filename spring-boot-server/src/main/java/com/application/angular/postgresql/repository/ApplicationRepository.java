package com.application.angular.postgresql.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.application.angular.postgresql.model.Application;

public interface ApplicationRepository extends JpaRepository<Application, Long> {
  List<Application> findByPublished(boolean published);

  List<Application> findByTitleContaining(String title);
}
