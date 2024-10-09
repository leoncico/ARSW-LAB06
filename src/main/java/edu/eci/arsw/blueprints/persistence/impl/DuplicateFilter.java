package edu.eci.arsw.blueprints.persistence.impl;
import java.util.ArrayList;
import java.util.List;

import edu.eci.arsw.blueprints.model.Blueprint;
import edu.eci.arsw.blueprints.model.Point;
import edu.eci.arsw.blueprints.persistence.BluePrintFilter;

//@Service
public class DuplicateFilter implements BluePrintFilter {
        
    @Override
    public void filter(Blueprint blueprint) {
        List<Point> points = blueprint.getPoints();
        List<Point> filteredPoints = new ArrayList<>();
        Point lastPoint = points.get(0);
        filteredPoints.add(lastPoint);

        for (int i = 1; i < points.size(); i++) {
            Point currentPoint = points.get(i);
            if (currentPoint.getX() != lastPoint.getX() || currentPoint.getY() != lastPoint.getY()) { 
                lastPoint = currentPoint;
                filteredPoints.add(lastPoint);
            }
        }

        blueprint.setPoints(filteredPoints);
    }

    
}
