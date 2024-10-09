package edu.eci.arsw.blueprints.persistence.impl;
import java.util.ArrayList;
import java.util.List;

import org.springframework.stereotype.Service;

import edu.eci.arsw.blueprints.model.Blueprint;
import edu.eci.arsw.blueprints.model.Point;
import edu.eci.arsw.blueprints.persistence.BluePrintFilter;

@Service
public class subsamplingFilter implements BluePrintFilter {
    @Override
    public void filter(Blueprint blueprint) {
        List<Point> points = blueprint.getPoints();
        List<Point> filteredPoints = new ArrayList<>();

        for (int i = 0; i < points.size(); i=i+2) {
            filteredPoints.add(points.get(i));
            
        }
        blueprint.setPoints(filteredPoints);
    }


}